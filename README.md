<strong>This README.md file provides steps for local system deployment using Docker and Docker Compose utilities.</strong>

<h1>Setup</h1>

Following setup manual will enable user to launch Substation Service instances responsible for generating and publishing data to Kafka cluster, setup of Kafka cluster with three brokers, Zookeper and Kowl instance for graphical analysis of the cluster. Setup then includes Consumer Service instances forming Consumer Group and ultimately, BigchainDB network of four nodes with configuration steps.

<h3>Prerequisities</h3>
In order to be able deploy the system successfully, current version of Docker and Docker Compose in required. It is also required to have local copy of the repository on your machine.

<h2>1. Kafka cluster setup</h2>
Make sure that your Docker daemon is up and running.
<ul>
  <li>Run docker-compose-kafka.yml file to setup cluster:<code>docker compose -f docker-compose-prod.yml up -d</code></li>
  <li>Execute into kafka-1 broker, go into bin directory and run:<code>./kafka-topics --create --topic   sensor_data.location1 --replication-factor 1 --partitions 3 --bootstrap-server localhost:19092</code>
</li>
  <li>Check status of containers</li>
</ul>

<h2>2. BigchainDB network setup</h2>
<ul>
  <li>Run BigchainDB network setup by executing Docker Compose file located in /bigchain/bigchaindb:<code>docker compose -f docker-compose-network.yml up -d</code></li>
  <li>Check status of BigchainDB network and containers</code></li>
  <li>For every running Tendermint instance do:
    <ul>
      <li>Execute to Tendermint instance and get node id by running : <code>tendermint show_node_id</code>, write down this id somewhere</li>
      <li>Go to files located on Tendermint container (except for one Tendermint container instance which we pick as Coordinator node), locate <code>genesis.json</code> file and copy validator part of the file, e.g: <br>
      <code>{
  "address": "1D4B2E5B73033D708A3E9ACB92E4697CF95DBC72",
  "pub_key": {
    "type": "tendermint/PubKeyEd25519",
    "value": "k4LASF3hP2iq7Vxc8LfwjU+s5ZeVFpDACZmOTUZXdQQ="
  },
"power": "10",
"name": "member1"
}</code><br>
      See "name" attribute, this attribute needs to be filled manually, write down the member for each Tendermint instance !
      </li>
      <li>Go to Tendermint Coordinator instance (One we chose), locate its genesis.json file and append the copied validator part to its validator part. The final validator part in Coordinator's genesis.json file will look something like this:<br>
      <code>{
  "address": "1D4B2E5B73033D708A3E9ACB92E4697CF95DBC72",
  "pub_key": {
    "type": "tendermint/PubKeyEd25519",
    "value": "k4LASF3hP2iq7Vxc8LfwjU+s5ZeVFpDACZmOTUZXdQQ="
  },
"power": "10",
"name": "coord"
},
{
  "address": "1D4B2E5B73033D708A3E9ACB92E4697CF95DBC80",
  "pub_key": {
    "type": "tendermint/PubKeyEd25519",
    "value": "k4LASF3hP2iq7Vxc8LfwjU+s5ZeVFpDACZmOTUZXdads="
  },
"power": "10",
"name": "member1"
},
{
  "address": "1D4B2E5B73033D708A3E9ACB92E4697CF95DBC74",
  "pub_key": {
    "type": "tendermint/PubKeyEd25519",
    "value": "k4LASF3hP2iq7Vxc8LfwjU+s5ZeVFpDACZmOTUZXddd="
  },
"power": "10",
"name": "member2"
},
{
  "address": "1D4B2E5B73033D708A3E9ACB92E4697CF95DBC75",
  "pub_key": {
    "type": "tendermint/PubKeyEd25519",
    "value": "k4LASF3hP2iq7Vxc8LfwjU+s5ZeVFpDACZmOTUZXdff="
  },
"power": "10",
"name": "member3"
}</code>
      </li>
      <li>Now, copy merged genesis.json file content to every Tendermint instance's genesis.json. The goal is to have exact same genesis time, network id and validators for every node in the network in order to synchronize.</li>
      <li></li>
    </ul>
  </li>
  <li>
    After we successfully distributed genesis.json file to all the Tendermint nodes, it is time to modify <code>config.toml</code>  configuration file in every Tendermint instance (including Coordinator node).
    <ul>
      <li>
        Execute to Tendermint instance and locate config.toml file located in the same directory as genesis.json file.
      </li>  
      <li>
        Do the following changes in config.toml file:
        <ul>
          <li>
            comment out <code>proxy_app</code> attribute settings.
          </li>  
          <li>
            Set name of the Tendermint node (name from validator part in genesis.json file) by modifying "moniker" attribute, e.g: <code>moniker= "member1"</code>
          </li>  
          <li>
            modify laddr attribute to “tcp://tendermint-n:26657” (replace n with corresponding tendermint instance id),e.g: <code>laddr= "tcp://tendermint-2:26657"</code><br>
            Do the same in p2p part of the file.
          </li>
          <li>
            Add persistent peers to setup connection to predefined set of nodes. Now we will utilize Tenedermint node ids to create connection strings; <br>
            The format of the connection string is following : <code>tendermint_node_id@tendermint-n:26656</code><br>
            Example of persistent peers for tendermint-1 (coordinator) instance:<br>
            <code>persistent_peers= “bc8a4a29a1e94fd75af24cdf00c3f2c3bc491164@tendermint-2:26656, e6b11acb2fcfd8138edf33b6b6a3c5d296efc93d@tendermint-3:26656,
0415b8a650c033034d59015e0c6d370f17a7ce7d@tendermint-4:26656”</code>
          </li>
          <li>
            set <code>addr_book_strict</code> attribute to false
          </li>
          <li>
            set <code>recheck</code> attribute to false
          </li>
          <li>
            set <code>create_empty_blocks</code> attribute to false
          </li>
        </ul>  
      </li> 
      <li>
        Run every tendermint (by executing to the container) instance by: <code>tendermint node --proxy_app=tcp://bigchaindb-n:26658</code> <br>
        replace n with corresponding tendermint instance number!
      </li>
    </ul>
  </li>
</ul>

 <h2>3. Consumer instances setup</h2>

 <ul>
   <li>
     Create local Docker image of Consumer Service by running: <code>docker build --tag consumer-service:latest .</code> in the directory of Consumer Service. 
   </li>
   <li>
      Run Docker command three times to setup 3 Consumer Service containers : <code>docker run -d --network=master_thesis_bigchain-network -e DOCKER=true -e BROKER_URI=kafka-1:19092 -e TOPIC=sensor_data.location1 -e BIGCHAIN_URI=http://bigchaindb:9984/api/v1/ -e GROUP_NAME=consumers.location1 consumer-service:latest</code>
   </li>
 </ul>

 <h2>4. Maintenance Service instance setup</h2>

 <ul>
   <li>
     Create local Docker image of Maintenance Service by running: <code>docker build --tag maintenance-service:latest .</code> in the directory of Maintenance Service. 
   </li>
   <li>
      Run Docker command to setup Maintenance Service container : <code>docker run -d --network=master_thesis_bigchain-network -e DOCKER=true -e BIGCHAIN_URI=http://bigchaindb:9984/api/v1/ -e MONGO_URI=mongodb://mongodb:27017/ -p 3000:3000 maintenance-service:latest</code>
   </li>
 </ul>

 <h2>4. Substation Service instance setup</h2>

 <strong> Setup Substation Service as last since when instance of the Substation Service is initiated, data generation starts and kafka topic is filling up with messages.</strong>

 <ul>
   <li>
     Create local Docker image of Substation Service by running: <code>docker build --tag substation-service:latest .</code> in the directory of Substation Service. 
   </li>
   <li>
      Run Docker command to setup Substation Service container 1 : <code>docker run -d --network=master_thesis_bigchain-network -e DOCKER=true -e BROKER_URI=kafka-1:19092 -e TOPIC=sensor_data.location1 -e SUBSTATION_ID=substation1 substation-service:latest</code>
   </li>
   <li>
      Run Docker command to setup Substation Service container 2 : <code>docker run -d --network=master_thesis_bigchain-network -e DOCKER=true -e BROKER_URI=kafka-1:19092 -e TOPIC=sensor_data.location1 -e SUBSTATION_ID=substation2 substation-service:latest</code>
   </li>
   <li>
      Run Docker command to setup Substation Service container 3 : <code>docker run -d --network=master_thesis_bigchain-network -e DOCKER=true -e BROKER_URI=kafka-1:19092 -e TOPIC=sensor_data.location1 -e SUBSTATION_ID=substation3 substation-service:latest</code>
   </li>
 </ul>

 System should be operating now, data generated from Substation Service instances to the Kafka cluster, consumed by Consumer Service instances and committed to the BighcainDB network. It is also possible to utilize REST API of Maintenance Service accessible on <code>localhost:3000</code>.
  
