window.onload = function () {
  document.getElementById('recall-form').addEventListener('submit', function (event) {
    event.preventDefault();
    emailjs.sendForm('service_0y78fmq', 'template_cnyz73s', this)
      .then(() => {
        console.log('SUCCESS!');
      }, (error) => {
        console.log('FAILED...', error);
      });
    emailjs.sendForm('service_0y78fmq', 'template_jcts0on', this)
      .then(() => {
        console.log('SUCCESS!');
      }, (error) => {
        console.log('FAILED...', error);
      });
  });
}