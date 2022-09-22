import ImageKit from 'imagekit';

export const generate = async (data: any) => {
  // const page = data.documentTask;
  const page = 'https://google.com';

  // Generate Evidence
  const api = `https://gen-image.rendiriz.com/api/image.png`;
  const url = encodeURIComponent(page);
  const generate = await fetch(`${api}?url=${url}`);
  const image = await generate.blob();

  // Blob to Buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload Imagekit
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: 'https://ik.imagekit.io/tlk1n6viqhs/',
  });

  const upload = await imagekit.upload({
    file: buffer,
    fileName: `${data.id}.png`,
    folder: 'groupware_rendiriz_com',
  });

  const uploadResult = await Promise.resolve(upload);

  return uploadResult.url;
};
