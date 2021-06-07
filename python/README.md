# Communication between an external web page and a notebook

```
echo  'c.NotebookApp.allow_origin = '*'' >> ~/.jupyter/jupyter_notebook_config.p
jupyter notebook
```

Open the `notebook.ipynb` contained in this project. Once the notebook is opened, you can stablish a connection from external UI using the notebook communication API.

Then you can serve the `visualizer` using python, or you prefered web server:

```
cd ..
python3 -m http.server --cgi 9999
```

Now you can open `http://localhost:9999/visualizer/?viewURL=views/home.json&baseUrl=http://localhost:8888/&token=a87e45748d987692b511876d69a656ecbd998b3fc8d96756`

You must change the baseUrl and token to point to your current jupyter notebook server. The info is printed in the console when you started jupyter.

Try to create variable in one side and use in the other side to verify that the communication is working
