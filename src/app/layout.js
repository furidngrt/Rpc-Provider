import './globals.css';  // Pastikan Tailwind diimpor

export const metadata = {
  title: 'Tambah RPC ke MetaMask',
  description: 'Menambahkan RPC ke MetaMask secara mudah.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
