import edge from 'electron-edge-js'
let extensionsArr = require('../extension.js')
const path = require('path')

 async function getIcons(cb) {
        // let array = extensionsArr.array;
        let ics
        let typesArr = extensionsArr.exArr.join(',')       
        let params = { types: typesArr }        
        let findImage = edge.func(path.join(__dirname, '../c#/IconExtract.csx'));

        findImage(params, async function(error, result) {
            if (error) throw error;
               ics = await parseJsonAsync(result.imageString)
              cb(ics)
              
         });
        

}



const parseJsonAsync = (jsonString) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.parse(jsonString))
    })
  })
}

 export default getIcons