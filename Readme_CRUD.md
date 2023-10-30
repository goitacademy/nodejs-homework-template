como hago operacion drun en un json usando node

Si deseas realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en un
archivo JSON utilizando Node.js, puedes seguir estos pasos generales:

1. Leer datos desde un archivo JSON:

- Utiliza el módulo fs.promises para leer el contenido del archivo JSON. Puedes
  hacerlo de la siguiente manera:

  ```javascript
  const fs = require('fs').promises;
  async function readDataFromFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON data:', error);
      return [];
    }
  }
  ```

2. Crear un nuevo elemento:

- Agrega un nuevo objeto al array de datos que obtuviste del archivo JSON.
  Luego, escribe los datos actualizados en el archivo. Aquí hay un ejemplo:

  ```javascript
  async function createData(filePath, newData) {
    try {
      const data = await readDataFromFile(filePath);
      data.push(newData);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return newData;
    } catch (error) {
      console.error('Error creating data:', error);
      return null;
    }
  }
  ```

3. Leer elementos existentes:

- Puedes leer los datos del archivo JSON utilizando la función readDataFromFile
  mencionada en el paso 1.

4. Actualizar un elemento existente:

- Busca el elemento que deseas actualizar en el array de datos. Luego, modifica
  sus propiedades y escribe los datos actualizados en el archivo. Aquí hay un
  ejemplo:

  ```javascript
  async function updateData(filePath, idToUpdate, updatedData) {
    try {
      const data = await readDataFromFile(filePath);
      const dataIndex = data.findIndex(item => item.id === idToUpdate);

      if (dataIndex !== -1) {
        data[dataIndex] = { ...data[dataIndex], ...updatedData };
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return data[dataIndex];
      } else {
        console.error('Data not found for update');
        return null;
      }
    } catch (error) {
      console.error('Error updating data:', error);
      return null;
    }
  }
  ```

5. Eliminar un elemento:

- Busca el elemento que deseas eliminar en el array de datos y elimínalo. Luego,
  escribe los datos actualizados en el archivo. Aquí hay un ejemplo:

  ```javascript
  async function deleteData(filePath, idToDelete) {
    try {
      const data = await readDataFromFile(filePath);
      const dataWithoutDeletedItem = data.filter(
        item => item.id !== idToDelete,
      );

      if (dataWithoutDeletedItem.length !== data.length) {
        await fs.writeFile(
          filePath,
          JSON.stringify(dataWithoutDeletedItem, null, 2),
        );
        return true;
      } else {
        console.error('Data not found for delete');
        return false;
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      return false;
    }
  }
  ```

  Nota que en estos ejemplos, asumimos que los elementos en el archivo JSON
  tienen una propiedad id que se utiliza para identificarlos. Puedes
  personalizar estos ejemplos según la estructura de tu archivo JSON y los datos
  que almacenas en él.
