export interface ResizeOptions {
  type: 'photo' | 'signature';
}

export const resizeJobImage = (file: File, options: ResizeOptions): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set exact dimensions based on BD Circular Rules
        if (options.type === 'photo') {
          canvas.width = 300;
          canvas.height = 300;
        } else {
          canvas.width = 300;
          canvas.height = 80;
        }

        if (!ctx) return reject(new Error('Canvas context failed'));

        // Draw image and stretch/crop to fill dimensions
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Determine target maximum file size in KB
        const maxKb = options.type === 'photo' ? 100 : 60;
        let quality = 0.95;

        const compress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error('Blob generation failed'));
              if (blob.size / 1024 > maxKb && quality > 0.1) {
                quality -= 0.05;
                compress(); // Recursive compression loop
              } else {
                resolve(blob);
              }
            },
            'image/jpeg',
            quality
          );
        };

        compress();
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
