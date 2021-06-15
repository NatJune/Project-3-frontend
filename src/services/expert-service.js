const BASE_URL = 'http://localhost:3001/api/experts';



async function fetchExperts(user) {
  const token = await user.getIdToken();
  return fetch(BASE_URL, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(res => res.json());
}

async function updateExpert({ expert, name,email,phone,_id }, user) {
  const token = await user.getIdToken();
  return fetch(`${BASE_URL}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ expert,name,email, phone})
    }).then(res => res.json());
}

 async function createExpert(data, user) {
  const token = await user.getIdToken();
  return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({...data, uid: user.uid})
    }).then(res => res.json())
}


async function deleteExpert(expertId, user) {
  const token = await user.getIdToken();
  return fetch(`${BASE_URL}/${expertId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      }
  }).then(res => res.json());
}


export {
    fetchExperts,
    updateExpert,
    createExpert,
    deleteExpert
}