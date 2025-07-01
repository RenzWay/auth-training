import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { GET, PUT, DELETE } from "../model/model";

async function GetPost(uid, setPost, setLoading) {
  setLoading(true);
  const getPost = await GET(uid);
  if (getPost) {
    // handle jika data nested {note: {...}} atau langsung objek
    const arr = Object.entries(getPost).map(([id, note]) => ({
      id,
      ...(note.note ? note.note : note),
    }));
    setPost(arr);
    console.table(arr);
  } else {
    setPost([]);
    console.table([]);
  }
  setLoading(false);
}

async function PutPost(uid, note) {
  try {
    const id = Date.now().toString();
    await PUT(uid, id, note);
  } catch (error) {
    console.error(`tak dapat mengirim post: ${error}`);
    alert(`error coba lagi ${error}`);
  }
}

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [number, setNumber] = useState();
  const [date, setDate] = useState(dayjs());
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const uid = sessionStorage.getItem("uid");
    GetPost(uid, setPost, setLoading);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = sessionStorage.getItem("uid");
    if (!uid) return;
    const note = {
      title,
      content,
      number,
      date: date.toISOString(),
      createdAt: new Date().toISOString(),
    };
    await PutPost(uid, note);
    setTitle("");
    setContent("");
    setNumber("");
    setDate(dayjs());
    // Refresh daftar post
    GetPost(uid, setPost, setLoading);
  };

  const handleDelete = async (id) => {
    const uid = sessionStorage.getItem("uid");
    if (!uid) return;
    await DELETE(uid, id);
    GetPost(uid, setPost, setLoading);
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-sky-200">
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-white/90 p-8 rounded-2xl shadow-2xl border border-blue-200 w-full m-20"
        >
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-extrabold text-blue-700">
              Tambah Post
            </h1>
          </header>
          <TextField
            variant="standard"
            label="Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            variant="standard"
            label="Isi"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            minRows={3}
          />
          <TextField
            label="Nomor Post"
            type="number"
            onChange={(e) => setNumber(e.target.value)}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Tanggal"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
          <Button variant="contained" type="submit">
            Tambah Post
          </Button>
        </form>
      </div>
      <div>
        <header>
          <h1>Daftar dari Post</h1>
        </header>

        <ul className="space-y-4 mt-4">
          {loading ? (
            <li className="text-blue-500 text-center">Memuat data...</li>
          ) : post.length === 0 ? (
            <li className="text-gray-400">Belum ada post.</li>
          ) : (
            post.map((note) => (
              <li
                key={note.id}
                className="bg-white/80 border border-blue-100 rounded-xl p-4 shadow hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-blue-700 text-lg">
                    {note.title}
                  </span>
                  <span className="text-xs text-gray-400">
                    {note.date ? new Date(note.date).toLocaleDateString() : ""}
                  </span>
                </div>
                <div className="text-gray-700 whitespace-pre-line mb-2">
                  {note.content}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Nomor Post: {note.number}</span>
                  <span>
                    Dibuat:{" "}
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleString()
                      : ""}
                  </span>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(note.id)}
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                  >
                    Hapus
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
