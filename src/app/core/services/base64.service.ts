import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor(
    private httpClient: HttpClient
  ) { }

  async getBase64(url: any): Promise<any> {
    const data = await this.getImg(url);
    console.log('data', data);

    if (data['ok']) {
      const archivo = await fetch(data['url']);
      const content = await archivo.blob();

      const metadata = {
        type: 'image/png',
      };

      if (archivo) {
        return new Promise((resolve, reject) => {
          const file: any = new File([content], 'imagen.png', metadata);
          const reader: any = new FileReader();

          reader.onload = () => {
            resolve(reader.result.toString());
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
    }
  }

  async getImg(url: string): Promise<any> {
    try {
      return await this.httpClient.get(url, { observe: 'response', responseType: 'arraybuffer'}).toPromise();
    } catch (error) {
      return {
        status: false,
        code: 804,
        message: 'Error al ejecutar la petición.',
      };
    }
  }
}
