
#*  откуда берем проект и какие прогр. поставить(поставь Node.js)
FROM node

#*  рабочая директория - создай папку под проект
WORKDIR /app

#*   и скопируй файлы в корневую папку образа
COPY . .

#*  поставь пакеты (добавляем все модули) из package.json 
RUN npm install

#*  запустить проект node app на этом порте
EXPOSE 3000

#*  комманда запуска
CMD ["node","server.js"]

#*  все это превращаем в образы
# в терминале
# docker build .

#*  смотрим информацию об образах через консоль
# в терминале смотрим образы и смотрим Image ID
# docker images

#*  делаем из образа контейнер
# в терминале, IMAGE ID - смотрим в докере или при docker images
# docker run IMAGE ID

#*  если образ запущен, для изменений его нужно оставновить
# 1.останавливаем в docker desktop, нажимая стоп на контейнере образа 
# 2. открываем новый терм, 
# ищем ID запущеного контейнера коммандой docker ps,
# останавливаем коммандой docker stop CONTAINER ID

#*  сново запустить
# 1. в docker desktop, нажимая run на контейнере образа 
# 2.в терм коммандой docker start CONTAINER ID

#*  создать образ, но не заходить в консоль
#* (на основе образа создаем новый контейнер)
# docker run -d IMAGE ID

#*  запустить проект на lockalhost:3000(внутренний порт, локальный), 
#*  указываем еще один порт(внешний порт, на вертуальном сервере)
# 1. останавливаем контейнер
# 2. docker run -d -p 4000:3000 IMAGE ID
# 3. открываем lockalhost:4000/api/contacts (например)



# Commands:
#   attach      Attach local standard input, output, and error streams to a running container
#   build       Build an image from a Dockerfile
#   commit      Create a new image from a container's changes
#   cp          Copy files/folders between a container and the local filesystem
#   create      Create a new container
#   diff        Inspect changes to files or directories on a container's filesystem
#   events      Get real time events from the server
#   exec        Run a command in a running container
#   export      Export a container's filesystem as a tar archive
#   history     Show the history of an image
#   images      List images
#   import      Import the contents from a tarball to create a filesystem image
#   info        Display system-wide information
#   inspect     Return low-level information on Docker objects
#   kill        Kill one or more running containers
#   load        Load an image from a tar archive or STDIN
#   login       Log in to a Docker registry
#   logout      Log out from a Docker registry
#   logs        Fetch the logs of a container
#   pause       Pause all processes within one or more containers
#   port        List port mappings or a specific mapping for the container
#   ps          List containers
#   pull        Pull an image or a repository from a registry
#   push        Push an image or a repository to a registry
#   rename      Rename a container
#   restart     Restart one or more containers
#   rm          Remove one or more containers
#   rmi         Remove one or more images
#   run         Run a command in a new container
#   save        Save one or more images to a tar archive (streamed to STDOUT by default)
#   search      Search the Docker Hub for images
#   start       Start one or more stopped containers
#   stats       Display a live stream of container(s) resource usage statistics
#   stop        Stop one or more running containers
#   tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
#   top         Display the running processes of a container
#   unpause     Unpause all processes within one or more containers
#   update      Update configuration of one or more containers
#   version     Show the Docker version information
#   wait        Block until one or more containers stop, then print their exit codes

