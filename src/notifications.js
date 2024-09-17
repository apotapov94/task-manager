import axios from 'axios'

const sendNotify = (params) => {
    axios({
        method: 'post',
        url: 'http://apotapov.beget.tech/send.php',
        data: params,
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(function(response) {
        console.log('Ответ сервера успешно получен!');
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);  
    });
}

export { sendNotify }