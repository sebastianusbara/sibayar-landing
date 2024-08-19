import Compressor from 'compressorjs';

export const thousandFormatter = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const formatIndonesianDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const validateIndonesianPhoneNumber = (phoneNumber: string): boolean => {
  const trimmedPhoneNumber = phoneNumber.trim();
  const indonesianPhoneNumberRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
  return trimmedPhoneNumber !== '' && indonesianPhoneNumberRegex.test(trimmedPhoneNumber);
};

export const compressFile = (file: File, quality: number = 0.9): Promise<File> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: quality,
      success: (compressedResult: Blob) => {
        const compressedFile = new File([compressedResult], file.name, {
          type: compressedResult.type,
        });
        resolve(compressedFile);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
};
