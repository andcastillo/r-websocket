# Communication between an external web page and a notebook

```
echo  'c.NotebookApp.allow_origin = '*'' >> ~/.jupyter/jupyter_notebook_config.p
jupyter notebook
```

Open the `notebook.ipynb` contained in this project. Once the notebook is opened, you can stablish a connection from external UI using the notebook communication API.

For now, you must manually change in the index.html the connection information. Using the token and port assigned to your jupyter server set the section  with id="jupyter-config-data":
```
 {
      "baseUrl": "http://localhost:8888/",
      "token": "e5257e099fd4097389b38271844c211450cf2cf513168cce"

 }
```

Then you can serve your web page using python, or you prefered web server:

```
cd browser-require
python3 -m http.server --cgi 9999
```

It will open the `index.html`. You can start writing and sending code to be evaluated in the
same kernel and session as used by `notebook.ipynb`. 

Try to create variable in one side and use in the other side to verify that the communication is working