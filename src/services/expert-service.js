const BASE_URL = 'http://localhost:3001/api/experts';



function fetchExperts(user) {
  return fetch(BASE_URL, {
    headers: {
      'Authorization': 'Bearer ' + user
    }
  }).then(res => res.json());
}

async function updateExpert({ name,email,phone,time,_id }) {
  return fetch(`${BASE_URL}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + _id
      },
      body: JSON.stringify({ name,email, phone, time})
    }).then(res => res.json());
}

 function createExpert(data, user) {
  return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + user
      },
      body: JSON.stringify({...data, user})
    }).then(res => res.json())
}


async function deleteExpert(expertId, user) {
  return fetch(`${BASE_URL}/${expertId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + user
      }
  }).then(res => res.json());
}


export {
    fetchExperts,
    updateExpert,
    createExpert,
    deleteExpert
}