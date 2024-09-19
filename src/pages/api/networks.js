import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  // Dapatkan path ke file networks.json
  const jsonDirectory = path.join(process.cwd(), 'public/data');
  // Baca isi file networks.json
  const fileContents = await fs.readFile(jsonDirectory + '/networks.json', 'utf8');
  // Parse isi file JSON menjadi objek
  const networks = JSON.parse(fileContents);

  // Kirim data networks sebagai response
  res.status(200).json(networks);
}
