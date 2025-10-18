const GDRIVE = window.__GDRIVE || {};
export const driveFolders = GDRIVE.folders || { profil:'', galeri:'', umkm:'', surat:'', proposal:'', laporan:'' };

export async function initDrive() {
  return new Promise((resolve) => {
    gapi.load("client:auth2", async () => {
      await gapi.client.init({
        apiKey: GDRIVE.apiKey,
        clientId: GDRIVE.clientId,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope: "https://www.googleapis.com/auth/drive.file"
      });
      const auth = gapi.auth2.getAuthInstance();
      if (!auth.isSignedIn.get()) await auth.signIn();
      resolve(gapi.auth.getToken().access_token);
    });
  });
}

export async function uploadToDrive(file, folderKey) {
  const accessToken = gapi.auth.getToken().access_token;
  const folderId = driveFolders[folderKey];
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify({ name: file.name, parents: [folderId] })], { type: 'application/json' }));
  form.append('file', file);
  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
    method: 'POST', headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }), body: form
  });
  const data = await res.json();
  await fetch(`https://www.googleapis.com/drive/v3/files/${data.id}/permissions`, {
    method: 'POST', headers: {'Authorization':'Bearer '+accessToken,'Content-Type':'application/json'},
    body: JSON.stringify({ role:'reader', type:'anyone' })
  });
  return `https://drive.google.com/uc?id=${data.id}`;
}
