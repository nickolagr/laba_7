# jenkins + sonarqube

### Install Sonar Server
```sudo apt-get update
sudo apt-get -y upgrade
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -

sudo apt-get -y install postgresql postgresql-contrib
sudo apt-get -y install unzip
sudo apt-get install openjdk-8-jre -y
```

```
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

```
sudo passwd postgres
su - postgres
createuser sonar

psql
ALTER USER sonar WITH ENCRYPTED password 'Sonar123';
CREATE DATABASE sonar OWNER sonar;
\q

exit
```

```
sudo wget -P /opt https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-6.4.zip
sudo unzip /opt/sonarqube-6.4.zip
sudo mv /opt/sonarqube-6.4 /opt/sonarqube
sudo adduser --system --no-create-home --group --disabled-login sonarqube
sudo chown -R sonarqube:sonarqube /opt/sonarqube
sudo nano /opt/sonarqube/conf/sonar.properties
```

```
sonar.jdbc.username=sonar
sonar.jdbc.password=P@ssword
sonar.web.javaAdditionalOpts=-server
sonar.jdbc.url=jdbc:postgresql://localhost/sonar
sonar.web.javaAdditionalOpts=-server
sonar.web.host=0.0.0.0
```

```
sudo touch /etc/systemd/system/sonar.service 
sudo nano /etc/systemd/system/sonar.service
```

#sonarqube.service
```[Unit]
Description=SonarQube service
After=syslog.target network.target
[Service]
Type=forking
ExecStart=/opt/sonarqube/bin/linux-x86-64/sonar.sh start
ExecStop=/opt/sonarqube/bin/linux-x86-64/sonar.sh stop
User=sonarqube
Group=sonarqube
Restart=always
[Install]
WantedBy=multi-user.target
```

```
sudo service sonarqube start
service sonarqube status
sudo systemctl enable sonarqube
```
---------------------------------------------------------------

Jenkins Server
```
cd /opt
sudo wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.2.0.1873-linux.zip
sudo unzip sonar-scanner-cli-4.2.0.1873-linux.zip
sudo mv sonar-scanner-cli-4.2.0.1873-linux sonarscanner
```
