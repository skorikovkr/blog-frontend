export default class FormImage {
  api: any;
  config: any;
  block: any;
  src: string | null = null;
  imagePreview: HTMLImageElement | null = null;

  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }
  constructor({ config, api, block }) {
    this.api = api;
    this.config = config;
    this.block = block;
  }

  handleImageChange(e: Event) {
    const file = ((e.target) as HTMLInputElement).files!.item(0);
    if (file) {
      this.src = URL.createObjectURL(file);
      this.imagePreview?.setAttribute("src", this.src ?? '/blank-post-photo.png');
    }
  }

  render() {
    const wrapper = document.createElement('div');
    this.imagePreview = document.createElement('img');
    this.imagePreview.setAttribute("id", 'image_preview_' + this.block.id);
    this.imagePreview.setAttribute("src", this.src ?? '/blank-post-photo.png');
    const input = document.createElement('input');
    input.setAttribute("id", 'image_' + this.block.id);
    input.setAttribute("class", "image-input");
    input.setAttribute("type", "file");
    input.setAttribute("name", 'image_' + this.block.id);
    input.setAttribute("accept", "image/png, image/jpeg");
    input.addEventListener("change", (e: Event) => this.handleImageChange(e))
    wrapper.appendChild(input);
    wrapper.appendChild(this.imagePreview);
    return wrapper;
  }

  save(blockContent: any){
    return {
      attached_to: 'image_' + this.block.id
    }
  }
}