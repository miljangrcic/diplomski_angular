import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {

  private fileToUpload: File = null
  @Input() imagePreviewURL = "";
  @Output() newImageChosen = new EventEmitter<File>();
  errorMessage = "";

  onFileSelected(files: FileList) {
    let file = files.item(0);

    if(!this.isImage(file)) {
      this.imagePreviewURL = "";
      this.errorMessage = "Odabrani fajl nije slika"
      return;
    }

    this.errorMessage = "";
    this.fileToUpload = files.item(0);
    this.newImageChosen.emit(this.fileToUpload);
    this.previewImage();
  }

  isImage(file: File) {
    return file.type.startsWith("image");
  }

  previewImage() {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(this.fileToUpload); // when reader finishes reading, onloadend is triggered
    fileReader.onloadend = () => this.imagePreviewURL = fileReader.result.toString();
  }

}
