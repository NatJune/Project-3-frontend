const BASE_URL = 'http://localhost:3001/api/experts';



async function fetchExperts(user) {
  const token = await user.getIdToken();
  return fetch(BASE_URL, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(res => res.json());
}

async function updateExpert({ expert, level, _id}, user) {
  const token = await user.getIdToken();
  return fetch(`${BASE_URL}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ expert, level })
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


async function deleteExpert(skillId, user) {
  const token = await user.getIdToken();

  return fetch(`${BASE_URL}/${skillId}`, {
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