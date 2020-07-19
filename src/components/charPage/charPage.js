import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/service';
import RowBlock from '../rowBlock'


export default class CharPage extends Component {
    
    gotServices = new GotService();

    state = {
        selectedChar: 130,
        error: false
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render () {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
            onCharSelected={this.onCharSelected}
            getData={this.gotServices.getAllCharacters}
            renderItem={({name, gender}) => `${name} (${gender})`}/>
        )
        
        const charDetails = (
            <CharDetails charId={this.state.selectedChar}/>
        )
        
        return (
            <RowBlock left={itemList} right={charDetails} />
        )
        
    }
}