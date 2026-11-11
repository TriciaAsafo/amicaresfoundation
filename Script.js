
/* =========================================
   AMI CARES FOUNDATION
   COMPLETE PROJECT AND GALLERY JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================
     VARIABLES
  ===================================== */

  const projectSection = document.getElementById("projects");
  const projectCards = document.querySelectorAll(".project-card");
  const projectGalleries = document.querySelectorAll(".project-gallery");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  let currentImages = [];
  let currentImageIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;


  /* =====================================
     PREPARE PROJECT GALLERIES
  ===================================== */

  projectGalleries.forEach(function (gallery) {

    const oldGrid = gallery.querySelector(".grid");

    if (!oldGrid || gallery.dataset.sliderReady === "true") {
      return;
    }

    const images = Array.from(oldGrid.querySelectorAll("img"));

    if (images.length === 0) {
      return;
    }

    // Create gallery section
    const gallerySection = document.createElement("div");
    gallerySection.className = "gallery-section";

    // Gallery heading
    const heading = document.createElement("div");
    heading.className = "gallery-heading";

    const headingTitle = document.createElement("h4");
    headingTitle.textContent = "Project Gallery";

    const counter = document.createElement("span");
    counter.className = "gallery-counter";
    counter.textContent = images.length + " Photos";

    heading.appendChild(headingTitle);
    heading.appendChild(counter);

    // Gallery slider
    const slider = document.createElement("div");
    slider.className = "gallery-slider";

    // Previous button
    const previousButton = document.createElement("button");
    previousButton.className = "gallery-arrow prev";
    previousButton.type = "button";
    previousButton.innerHTML = "&#10094;";
    previousButton.setAttribute("aria-label", "Previous photos");

    // Next button
    const nextButton = document.createElement("button");
    nextButton.className = "gallery-arrow next";
    nextButton.type = "button";
    nextButton.innerHTML = "&#10095;";
    nextButton.setAttribute("aria-label", "Next photos");

    // Sliding track
    const track = document.createElement("div");
    track.className = "gallery-track";

    // Move existing images into slider
    images.forEach(function (image, index) {

      const slide = document.createElement("div");
      slide.className = "gallery-slide";

      image.dataset.galleryIndex = index;
      image.loading = "lazy";

      slide.appendChild(image);
      track.appendChild(slide);

      // Open enlarged image
      image.addEventListener("click", function () {
        openLightbox(gallery, index);
      });

    });

    slider.appendChild(track);
    slider.appendChild(previousButton);
    slider.appendChild(nextButton);

    gallerySection.appendChild(heading);
    gallerySection.appendChild(slider);

    // Replace old image grid
    oldGrid.replaceWith(gallerySection);

    // Slide navigation
    previousButton.addEventListener("click", function () {
      track.scrollBy({
        left: -track.clientWidth * 0.8,
        behavior: "smooth"
      });
    });

    nextButton.addEventListener("click", function () {
      track.scrollBy({
        left: track.clientWidth * 0.8,
        behavior: "smooth"
      });
    });

    gallery.dataset.sliderReady = "true";

  });


  /* =====================================
     OPEN PROJECT
  ===================================== */

  window.openProject = function (projectId) {

    // Hide all project cards
    projectCards.forEach(function (card) {
      card.style.display = "none";
    });

    // Hide all project details
    projectGalleries.forEach(function (gallery) {
      gallery.classList.add("hidden");
      gallery.style.display = "none";
    });

    // Find selected project
    const selectedProject = document.getElementById(projectId);

    if (!selectedProject) {
      return;
    }

    // Show selected project
    selectedProject.classList.remove("hidden");
    selectedProject.style.display = "block";

    // Reset its gallery to the beginning
    const track = selectedProject.querySelector(".gallery-track");

    if (track) {
      track.scrollTo({
        left: 0,
        behavior: "instant"
      });
    }

    // Scroll to project details
    selectedProject.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  };


  /* =====================================
     CLOSE PROJECT
  ===================================== */

  window.closeProject = function () {

    // Hide all project details
    projectGalleries.forEach(function (gallery) {
      gallery.classList.add("hidden");
      gallery.style.display = "none";
    });

    // Show all project cards again
    projectCards.forEach(function (card) {
      card.style.display = "";
    });

    // Return to project overview
    if (projectSection) {
      projectSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  };


  /* =====================================
     CREATE LIGHTBOX CONTROLS
  ===================================== */

  let lightboxPrevious = document.getElementById("lightbox-prev");
  let lightboxNext = document.getElementById("lightbox-next");
  let lightboxCounter = document.getElementById("lightbox-counter");

  // Previous image button
  if (!lightboxPrevious && lightbox) {

    lightboxPrevious = document.createElement("button");
    lightboxPrevious.id = "lightbox-prev";
    lightboxPrevious.className = "lightbox-arrow lightbox-prev";
    lightboxPrevious.type = "button";
    lightboxPrevious.innerHTML = "&#10094;";
    lightboxPrevious.setAttribute("aria-label", "Previous image");

    lightbox.appendChild(lightboxPrevious);

  }

  // Next image button
  if (!lightboxNext && lightbox) {

    lightboxNext = document.createElement("button");
    lightboxNext.id = "lightbox-next";
    lightboxNext.className = "lightbox-arrow lightbox-next";
    lightboxNext.type = "button";
    lightboxNext.innerHTML = "&#10095;";
    lightboxNext.setAttribute("aria-label", "Next image");

    lightbox.appendChild(lightboxNext);

  }

  // Image counter
  if (!lightboxCounter && lightbox) {

    lightboxCounter = document.createElement("p");
    lightboxCounter.id = "lightbox-counter";
    lightboxCounter.className = "lightbox-counter";

    lightbox.appendChild(lightboxCounter);

  }


  /* =====================================
     OPEN LIGHTBOX
  ===================================== */

  function openLightbox(gallery, imageIndex) {

    if (!lightbox || !lightboxImage) {
      return;
    }

    // Get all images from the selected project only
    currentImages = Array.from(
      gallery.querySelectorAll(".gallery-track img")
    );

    if (currentImages.length === 0) {
      return;
    }

    currentImageIndex = imageIndex;

    updateLightbox();

    lightbox.classList.add("active");
    lightbox.style.display = "flex";

    document.body.style.overflow = "hidden";

  }


  /* =====================================
     UPDATE LIGHTBOX IMAGE
  ===================================== */

  function updateLightbox() {

    if (!currentImages.length) {
      return;
    }

    const selectedImage = currentImages[currentImageIndex];

    lightboxImage.src = selectedImage.src;

    lightboxImage.alt = selectedImage.alt || "AMI Cares project photo";

    if (lightboxCounter) {
      lightboxCounter.textContent =
        (currentImageIndex + 1) + " / " + currentImages.length;
    }

    // Hide navigation if there is only one image
    if (lightboxPrevious) {
      lightboxPrevious.style.display =
        currentImages.length > 1 ? "flex" : "none";
    }

    if (lightboxNext) {
      lightboxNext.style.display =
        currentImages.length > 1 ? "flex" : "none";
    }

  }


  /* =====================================
     NEXT IMAGE
  ===================================== */

  function nextImage() {

    if (currentImages.length <= 1) {
      return;
    }

    currentImageIndex++;

    // Loop back to first image
    if (currentImageIndex >= currentImages.length) {
      currentImageIndex = 0;
    }

    updateLightbox();

  }


  /* =====================================
     PREVIOUS IMAGE
  ===================================== */

  function previousImage() {

    if (currentImages.length <= 1) {
      return;
    }

    currentImageIndex--;

    // Loop to last image
    if (currentImageIndex < 0) {
      currentImageIndex = currentImages.length - 1;
    }

    updateLightbox();

  }


  /* =====================================
     LIGHTBOX BUTTON EVENTS
  ===================================== */

  if (lightboxNext) {
    lightboxNext.addEventListener("click", function (event) {
      event.stopPropagation();
      nextImage();
    });
  }

  if (lightboxPrevious) {
    lightboxPrevious.addEventListener("click", function (event) {
      event.stopPropagation();
      previousImage();
    });
  }


  /* =====================================
     CLOSE LIGHTBOX
  ===================================== */

  function closeLightbox() {

    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("active");
    lightbox.style.display = "none";

    lightboxImage.src = "";

    currentImages = [];
    currentImageIndex = 0;

    document.body.style.overflow = "";

  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }


  /* =====================================
     CLOSE WHEN CLICKING OUTSIDE IMAGE
  ===================================== */

  if (lightbox) {

    lightbox.addEventListener("click", function (event) {

      if (
        event.target === lightbox ||
        event.target === lightboxImage
      ) {

        if (event.target === lightbox) {
          closeLightbox();
        }

      }

    });

  }


  /* =====================================
     KEYBOARD NAVIGATION
  ===================================== */

  document.addEventListener("keydown", function (event) {

    if (!lightbox || !lightbox.classList.contains("active")) {
      return;
    }

    if (event.key === "ArrowRight") {
      nextImage();
    }

    if (event.key === "ArrowLeft") {
      previousImage();
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

  });


  /* =====================================
     MOBILE SWIPE NAVIGATION
  ===================================== */

  if (lightbox) {

    lightbox.addEventListener("touchstart", function (event) {

      touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });

    lightbox.addEventListener("touchend", function (event) {

      touchEndX = event.changedTouches[0].screenX;

      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) > 50) {

        if (difference > 0) {
          nextImage();
        } else {
          previousImage();
        }

      }

    }, { passive: true });

  }

});
