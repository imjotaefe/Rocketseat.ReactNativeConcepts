import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import api from './service/api'

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    const newProject = {
      title: 'teste project',
      owner: 'JF',
    }

    const response = await api.post('projects', newProject);

    const project = response.data.project;
    setProjects([...projects, project]);
  }

  return (
    <>
      <FlatList
        keyExtractor={project => project.id}
        data={projects}
        renderItem={({ item }) => (
          <View style={styles.projectContainer}>
            <Text style={styles.textProject}>{item.title}</Text>
          </View>
        )}
        style={styles.container}
      />
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleAddProject}>
        <Text style={styles.textButton}>Adicionar Projeto</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    flex: 1,
  },

  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  textProject: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },

  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7159c1'
  },

  projectContainer:{
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  }
})