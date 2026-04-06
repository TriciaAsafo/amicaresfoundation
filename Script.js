// OPEN PROJECT
function openProject(projectId) {
  const allProjects = document.querySelectorAll('.project-gallery');

  allProjects.forEach(project => {
    project.style.display = "none";
  });

  const selected = document.getElementById(projectId);

  if (selected) {
    selected.style.display = "block";

    selected.scrollIntoView({
      behavior: "smooth"
    });
  }
}


// CLOSE PROJECT
function closeProject() {
  const allProjects = document.querySelectorAll('.project-gallery');

  allProjects.forEach(project => {
    project.style.display = "none";
  });

  // scroll back to project cards
  document.getElementById("projects").scrollIntoView({
    behavior: "smooth"
  });
}
// IMAGE CLICK → OPEN LIGHTBOX
document.querySelectorAll('.project-gallery img').forEach(img => {
  img.addEventListener('click', function () {
    document.getElementById('lightbox').style.display = 'flex';
    document.getElementById('lightbox-img').src = this.src;
  });
});

// CLOSE LIGHTBOX
document.getElementById('lightbox-close').onclick = function () {
  document.getElementById('lightbox').style.display = 'none';
};