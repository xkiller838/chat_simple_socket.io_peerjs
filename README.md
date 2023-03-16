## Funcionamiento en Node
-Primero se debe ejecutar el proyecto node con el comando 
~~~
npm run dev
~~~
- si el codigo compila bien al ejecutar el comando y conectar los demas en node y los comandos de los nodos debera aparcer en la consola de vs code la siguiente imagen
- Cada que se actualiza la web se cambian los id de conexion por lo tanto deben volverse a agregar los nodos para hacer la conexion lo que permite que los nuevos id se reflejen en la consola de vs code.

![img-1](https://user-images.githubusercontent.com/33810066/225120937-0b6b5205-7606-455c-85e5-b0bde322ae94.png)

## Funcionamiento en Vue
### Se abre proyecto en vue nodo_1_vue y se ejecuta el proyecto con el siguiente comando 
-Si la conexion entre ambos nodos es exitosa mostrara en consola del navegador un mensaje de bienvenida
~~~
npm run dev -- --host
~~~

![img-1](https://user-images.githubusercontent.com/33810066/225769849-d7c8a9b4-8097-4463-ae25-f9e9fce0aed9.png)

### Se abre proyecto en vue nodo_2_vue y se ejecuta el proyecto con el siguiente comando 
~~~
npm run dev -- --host
~~~
-En el segundo nodo conectado aparecera igual que el primero pero ejecutando en otro puerto coloca nombre en el primer y segundo nombre

![img-2](https://user-images.githubusercontent.com/33810066/225769894-591e2f3c-d9ef-4907-b3ca-8723cf219486.png)

## Conexin establecida 

-cuando la conexion se alla establecido podremos chatiar entre nodos de la siguiente manera

![img-3](https://user-images.githubusercontent.com/33810066/225770500-3890c9d8-891b-4926-82e5-70a4f8ac0964.png)
