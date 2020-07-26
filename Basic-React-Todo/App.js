import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Button, Alert } from 'react-native';



function TodoItem({ item, pressHandler }) {
    return (
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
        <Text style={styles.item}>{item.text}</Text>
        </TouchableOpacity>
    )
    
}
function AddTodo({submitHandler}) {
    
    const [text, setText] = useState('');
    
    const changeHandler = (val) => {
        setText(val);
    }

    return (
        <View>
        <TextInput
        multiline
        numberOfLines={4}
        style={styles.input}
        placeholder='Topic'
        onChangeText={changeHandler}
        />
        <Button onPress={() => submitHandler(text)} title='Comments' color='#4e4e4e' />
        </View>
    );
}

function App () {
	const [todos, setTodos] = useState([]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const submitHandler = (text) => {
    if(text.length > 10 ) {
    setTodos((prevTodos) => {
      return [
        {text: text, key: Math.random().toString()},
        ...prevTodos
      ];
    });
    } else {
      Alert.alert('Oops!', 'Must write something Valuable', [
      {text: 'UnderStood', onPress: () => console.log('alert closed')}
      ])
    }
  }
	return (
		<View style={styles.container}>
			<View style={styles.content}>
        <AddTodo submitHandler={submitHandler}/>
				<View style={styles.list}>
					<FlatList
					data={todos}
					renderItem={({item}) => (
						<TodoItem item={item} pressHandler={pressHandler}/>
						)}
					/>
		        </View>
			</View>
		</View>
		);
}

const styles =StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#fff'
	},
	content: {
		padding: 40,
	},
	list: {
		marginTop: 20,
	},
   item: {
     padding: 16,
     marginTop: 16,
     borderWidth: 1,
     borderColor: '#bbb',
     borderStyle: 'dashed',
     borderRadius: 10
 },
    input: {
        marginBottom: 10,
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderBottomWidth: 5,
        height: 50, borderWidth: 1,
        borderColor: '#bbb',
        flexDirection: 'row',
        alignContent: 'stretch',
        justifyContent: 'center'
    },

})

export default App;