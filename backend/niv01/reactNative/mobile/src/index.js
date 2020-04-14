import React, { useEffect, useState} from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api'

export default function App(){
    const [projects, setProject] = useState([])

    useEffect(() => {
        api.get('projects').then(res => {
          setProject(res.data)
        })
    },[])

    async function hanldeAddProject()
    {
      const response = await api.post('projects', {
        title: `Novo Projeto ${Date.now()}` ,
        owner: 'Jose Luiz'
      });

      const project = response.data;

      setProject([...projects, project])
    }

    return(
      <>
        <StatusBar barStyle="light-content" backgroundColor="#639" />
        <SafeAreaView  style={styles.container}>
          <FlatList  
            data={projects}
            keyExtractor={project => project.id}
            renderItem={({item: project }) =>(
              <Text style={styles.project}>{project.title}</Text>
            )}
          
          />

         <TouchableOpacity 
            activeOpacity={.6} 
            style={styles.button}
            onPress={hanldeAddProject}
            
            >
           <Text style={styles.textButton}>Adicionar projeto</Text>
         </TouchableOpacity>
        
        </SafeAreaView>
      </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#639',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    project: {
      color: '#fff',
      fontSize: 30
    },
    button: {
       backgroundColor: '#fff',
       margin: 20,
       height: 50,
       borderRadius: 4,
       justifyContent: 'center',
       alignItems: 'center'

    },
    textButton: {
       color: '#333',
       fontSize: 20,

    }
    
});