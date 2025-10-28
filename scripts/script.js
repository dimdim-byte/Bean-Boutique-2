const goToPage = (url) => {
  window.location.href = url;
}


const toggleInfo = (e) => {
  const button = e.currentTarget;
  const card = button.closest('.coffee-card');
  card.classList.toggle('active');
  const icon = button.querySelector('i');
  icon.classList.toggle('bi-chevron-down');
  icon.classList.toggle('bi-chevron-up');

 
}