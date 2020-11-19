import wait from "waait";

export default class Modal {
  constructor({ content, size = "default" }) {
    this.content = content;
    this.size = size;
    this.deactivateModal = this.deactivateModal.bind(this);
    this.handleEscKey = this.handleEscKey.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.observeModalClose();
    this.addContentToModal();
    this.activateModal();
  }

  observeModalClose() {
    this.modalButton.addEventListener("click", this.deactivateModal);
    document.addEventListener("keyup", this.handleEscKey);
    this.modalWrapper.addEventListener("click", this.handleModalClick);
  }

  handleEscKey(event) {
    if (event.key === "Escape") {
      this.deactivateModal();
    }
  }

  handleModalClick(event) {
    const isOuterModal = event.target.contains(this.modalContent);
    if (isOuterModal) {
      this.deactivateModal();
    }
  }

  async addContentToModal() {
    this.modalContent.classList.add(`modal--${this.size}`);
    if (typeof this.content === "object") {
      this.modalContent.appendChild(this.content);
    } else {
      this.modalContent.innerHTML = this.content;
    }
  }

  async activateModal() {
    this.modalWrapper.removeAttribute("style");
    await wait(0);
    this.modalWrapper.setAttribute("data-active", true);
  }

  async deactivateModal() {
    this.modalWrapper.removeAttribute("data-active");
    await wait(150);
    this.modalWrapper.style.display = "none";
    this.modalButton.removeEventListener("click", this.deactivateModal);
    document.removeEventListener("keyup", this.handleEscKey);
    this.modalWrapper.removeEventListener("click", this.handleModalClick);
  }

  get modalContent() {
    return document.querySelector("[data-modal-content]");
  }

  get modalWrapper() {
    return document.querySelector("[data-modal-wrapper]");
  }

  get modalButton() {
    return document.querySelector("[data-modal-close]");
  }
}
