export const urlAPI =
  "https://auth-training-9bba5-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function PUT(uid, id, note) {
  try {
    const response = await fetch(`${urlAPI}/notes/${uid}/${id}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error("Gagal simpan");
    return await response.json();
  } catch (er) {
    console.error(`gagal tambah:${er}`);
    throw er;
  }
}

export async function GET(uid) {
  try {
    const response = await fetch(`${urlAPI}/notes/${uid}.json`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Gagal fetch");
    const data = await response.json();
    return data;
  } catch (er) {
    console.error(`gagal mengambil dari get:${er}`);
    throw er;
  }
}

export async function DELETE(uid, id) {
  try {
    const response = await fetch(`${urlAPI}/notes/${uid}/${id}.json`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Gagal hapus");
    return await response.json();
  } catch (error) {
    console.error(`gagal hapus: ${error}`);
    throw error;
  }
}
