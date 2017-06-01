<h2>Pasos</h2>
<ol>
<li>Ejecutar el comando : <b>npm install</b></li>
<li>Ejecutar el comando : <b>npm install -g pm2</b></li>
<li>Crear un KeySpace llamado "tigo" en Cassandra</li>
<li>Ejecutar en cassandra los archivos que se encuentran en la carpeta "Scripts"</li>
<li>Configurar uno de los archivos de propiedades segun el entorno
<p>En estos archivos se configuran propiedades como la conexión a la base de datos, el puerto que usa la API...</p>

<table>
<tr>
<th>Archivo</th>
<th>Entorno</th>
</tr>
<tr>
<td>config/development.json</td>
<td>Desarrollo</td>
</tr>
<tr>
<td>config/testing.json</td>
<td>Testing</td>
</tr>
<tr>
<td>config/production.json</td>
<td>Producción</td>
</tr>
</table>
</li>
<li>Ejecutar el comando segun el entorno:</li>
<table>
<tr>
<th>Comando</th>
<th>Entorno</th>
</tr>
<tr>
<td>npm run development</td>
<td>Desarrollo</td>
</tr>
<tr>
<td>npm run testing</td>
<td>Testing</td>
</tr>
<tr>
<td>npm run production</td>
<td>Producción</td>
</tr>
</table>

</li>
<li>Ingresar a la API, dependera de la configuración, la dirección por defecto es : 
<a href="http://localhost:5001/cassandra/api/v1/agent">http://localhost:5001/cassandra/api/v1/agent</a>
</li>
</ol>


