async function ExerciseLoader({ request, params }) {
  const res = await fetch("http://127.0.0.1:5555/exercises", {
    credentials: 'include',
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error('Failed to load exercises');
      }
    })
    .catch(error => {
      console.error('Error fetching exercises:', error);
      throw error;
    });
  return res;
}

async function userLoader({ request, params }) {
  const res = await fetch('http://127.0.0.1:5555/check_session', {
    method: 'GET',
    credentials: 'include',
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        return {};
      }
    })
    .catch(error => {
      console.error('Error checking session:', error);
      throw error;
    });
  return res;
}

async function profileLoader({ request, params }) {
  const res = await fetch('http://127.0.0.1:5555/profile', {
    credentials: 'include',
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error('Failed to load profile');
      }
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
      throw error;
    });
  return res;
}

async function activityLoader({ request, params }) {
  const date = new URL(request.url).searchParams.get('date');
  const res = await fetch(`http://127.0.0.1:5555/activity?date=${date}`, {
    credentials: 'include',
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error('Failed to load activity');
      }
    })
    .catch(error => {
      console.error('Error fetching activity:', error);
      throw error;
    });
  return res;
}

export {
  ExerciseLoader,
  userLoader,
  profileLoader,
  activityLoader
};

