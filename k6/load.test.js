import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function() {
  return [
    { username: 'user1_ebac', password: 'psw!ebac@test' },
    { username: 'user2_ebac', password: 'psw!ebac@test' },
    { username: 'user3_ebac', password: 'psw!ebac@test' },
    { username: 'user4_ebac', password: 'psw!ebac@test' },
    { username: 'user5_ebac', password: 'psw!ebac@test' },
  ];
});

export let options = {
  stages: [
    { duration: '20s', target: 20 }, 
    { duration: '1m40s', target: 20 }, 
  ],
};

export default function() {
  const user = users[Math.floor(Math.random() * users.length)];

  const loginRes = http.post('http://lojaebac.ebaconline.art.br/minha-conta/', {
    log: user.username,
    pwd: user.password,
  });

  check(loginRes, {
    'login success': (res) => res.status === 200,
  });

  sleep(1); 
}
