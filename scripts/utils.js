export const previewPopup = document.querySelector(".popup_type_preview");
export const previewImageElement = document.querySelector(
  ".popup__preview-image"
);
export const previewImageElementTitle =
  document.querySelector(".popup__caption");

export const openPopup = (popType) => {
  popType.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
};

const closePopupEsc = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

export const closePopup = (popType) => {
  popType.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
};
