import { Injectable } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
 

   writeToClipboard = async (data:any) => {
    await Clipboard.write({
      string: data
    });
  };
  
   checkClipboard = async () => {
    const { type, value } = await Clipboard.read();
  
  alert(`Got ${type} from clipboard: ${value}`);
  };


}
