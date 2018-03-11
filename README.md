# Inspiration
Macular degeneration has over 200,000 reported cases each year and there are many more people who have vision loss or are legally blind. Sensorineural Hearing Loss accounts for 90% of all hearing loss. The progressive or sudden loss of primary senses can be traumatizing and difficult. Our goal is to provide affordable, durable, and accessible support in the homes of those with sensory loss.

# What it does
The GUI we built is designed to be very user friendly specifically marketed towards customers that have little to no coding experience. The hope is that the user will be able to customize and actively change the system to suit their needs and the structure of their house. We provide the user with command blocks and input output connections to help visualize the code which at the click of a button will be compiled. Since the entire system is modular the user has the freedom of exploration for them to find the home that best supports their needs. We have two different uses prepared to show off. The first scenario is a suggested function for a person with significant hearing loss. The Arduino's can be programmed to read in which room the user is in to determine where to send the output to. Someone rings the doorbell, the system reads in which room has the user in, and it displays a visual cue in the form of a light alerting the user there is someone at the door. The second scenario is a suggested function for a person with loss of vision which will assist in directional awareness. The user will carry and button and when pressed there is a series of 4 speakers each identified with their own noise, each speaker is associated with a cardinal direction which they can set themselves. Based on the noise and where they hear each coming from, the user can regain their sense of direction.

## Build Setup

``` bash
# install dependencies
yarn install

node main.js
```

You also have to declare following envvars:
* PORT
* MONGODB
* SECRET
