import http from 'k6/http';

export let options = {
  vus: 5,
  duration: '10s',
}

export default function() {
  http.get("http://host.docker.internal:4000/search-abi?chain-id=5&address=0x980306e668Fa1E4246e2AC86e06e12B67A5fD087")
}