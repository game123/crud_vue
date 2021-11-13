/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import { shallowMount, flushPromises } from '@vue/test-utils'
import Content from '@/components/Content.vue'
import axios from 'axios'

// Spy the console log
global.console.log = jest.fn()

// Mock the axios library
jest.mock('axios')

describe('Content.vue Test with Successful HTTP GET, POST, DELETE, and PUT', () => {
  let wrapper = null

  beforeEach(() => {
    const mock_get_response = { data: [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz'
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv'
      }
    ]}

    const mock_post_response = { data: [
      {
        id: 3,
        name: 'Patrick',
        username: 'patrick123',
        email: 'patrick@email.com'
      }
    ] }

    const mock_delete_response = { data: [
      {
        id: 2
      }
    ] }
  
    const mock_put_response = { data: [
      {
        id: 1,
        name: 'Patrick',
        username: 'patrick456',
        email: 'patrick@email.com'
      }
    ] }

    // Set the mock call to GET to return a successful GET response
    axios.get.mockResolvedValue(mock_get_response)

    // Set the mock call to POST to return a successful POST request
    axios.post.mockResolvedValue(mock_post_response);

    // Set the mock call to DELETE to return a successful DELETE request
    axios.delete.mockResolvedValue(mock_delete_response);

    // Set the mock call to PUT to return a successful PUT response
    axios.put.mockResolvedValue(mock_put_response)

    // render the component
    wrapper = shallowMount(Content)
  });

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  });

  it('loads the user data when the component is created and mounted', async () => {
    // Wait until the DOM updates
    await flushPromises()

    // Check that the heading text is rendered
    const heading = wrapper.findAll('h1')
    expect(heading.length).toEqual(1)
    expect(heading[0].text()).toMatch('List of Users:')

    // Check that one call was made to axios.get()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/users')
  
    // Check that the user data is properly set
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.users[0].name).toMatch('Leanne Graham')
    expect(wrapper.vm.users[0].username).toMatch('Bret')
    expect(wrapper.vm.users[0].email).toMatch('Sincere@april.biz')
    expect(wrapper.vm.users[1].name).toMatch('Ervin Howell')
    expect(wrapper.vm.users[1].username).toMatch('Antonette')
    expect(wrapper.vm.users[1].email).toMatch('Shanna@melissa.tv')

    // check that the banner message indicates success
    expect(wrapper.vm.messageToDisplay).toMatch('SUCCESS! Loaded user data!')
    expect(wrapper.vm.messageType).toMatch('Success')
  })

  it('save the new user data', async () => {
    // set the input data for user #3
    var newUser3 = {
      id: 3,
      name: 'Patrick',
      username: 'patrick123',
      email: 'patrick@email.com',
      editing: false
    }
  
    // call the createUser() function with user #3
    wrapper.vm.createUser(newUser3);
  
    // Wait until the DOM updates
    await flushPromises()

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toBeCalledWith('https://jsonplaceholder.typicode.com/users', newUser3)
  
    expect(wrapper.vm.users.length).toEqual(3)
    expect(wrapper.vm.messageType).toMatch('Success')
    expect(wrapper.vm.messageToDisplay).toMatch('SUCCESS! User data was saved!')
  })

  it('deletes the user #2 data', async () => {
    // set the input data for the user to delete
    var deleteUser2 = {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    }
  
    // call the createUser() function with user #1
    wrapper.vm.deleteUser(deleteUser2);
      
    // Wait until the DOM updates
    await flushPromises()

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toBeCalledWith('https://jsonplaceholder.typicode.com/users/2')
  
    expect(wrapper.vm.users.length).toEqual(1)
    expect(wrapper.vm.messageType).toMatch('Success')
    expect(wrapper.vm.messageToDisplay).toMatch('SUCCESS! User #2 was deleted!')
  })

  it('updates the data for user #1', async () => {
    // set the input data for the user to update
    var updateUser1 = {
      index: 0,
      id: 1,
      name: 'Patrick',
      username: 'patrick456',
      email: 'patrick@email.com',
      editing: false
    }
  
    // call the updateUser() function with user #1
    wrapper.vm.updateUser(updateUser1)
    
    // Wait until the DOM updates
    await flushPromises()

    expect(axios.put).toHaveBeenCalledTimes(1)
    expect(axios.put).toBeCalledWith('https://jsonplaceholder.typicode.com/users/1')
  
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.messageType).toMatch('Success')
    expect(wrapper.vm.messageToDisplay).toMatch('SUCCESS! User #1 was updated!')
  })

  it('changes user to edit-mode', () => {
    // set the input data for the user to update
    const user1 = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      editing: false
    }

    // set the 'editing' flag to be false for user #1
    wrapper.vm.users[0].editing = false

    // call editUser() for user #1
    wrapper.vm.editUser(user1)
  
    // check that user #1 is now in edit mode
    expect(wrapper.vm.users[0].editing).toBe(true)
  })
  
  it('cancels the user from edit-mode', () => {
    const user1 = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      editing: false
    }

    // set the 'editing' flag to be true for user #1
    wrapper.vm.users[0].editing = true
  
    // call cancelEditUser() for user #1
    wrapper.vm.cancelEditUser(user1)
  
    // check that user #1 is now in edit mode
    expect(wrapper.vm.users[0].editing).toBe(false)
  })
})

describe('Content.vue Test with Failed HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    // Set the mock call to GET to return a failed GET request
    axios.get.mockRejectedValue(new Error('BAD REQUEST'))

    // Render the component
    wrapper = shallowMount(Content)
  })

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('loads no user data when the HTTP GET request fails', async () => {  
    // Wait until the DOM updates
    await flushPromises()

    // Check that zero calls were made to axios.get()
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/users')
  
    // Check that there is no user data loaded when the GET request fails
    expect(wrapper.vm.users.length).toEqual(0)

    // check that the banner message indicates failure
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to load user data!')
    expect(wrapper.vm.messageType).toMatch('Error')
  })
})

describe('Content.vue Test with Successful HTTP GET, Failed HTTP POST, Failed HTTP DELETE, and Failed HTTP PUT', () => {
  let wrapper = null

  beforeEach(() => {
    const mock_get_response = { data: [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz'
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv'
      }
    ]}
  
    // Set the mock call to GET to return a successful GET response
    axios.get.mockResolvedValue(mock_get_response)

    // Set the mock call to POST to return a failed POST request
    axios.post.mockRejectedValue(new Error('BAD CREATE'))

    // Set the mock call to DELETE to return a failed DELETE request
    axios.delete.mockRejectedValue(new Error('BAD DELETE'))

    // Set the mock call to PUT to return a failed PUT request
    axios.put.mockRejectedValue(new Error('BAD PUT'))

    // render the component
    wrapper = shallowMount(Content)
  });

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  });

  it('does not save the new user data on failed HTTP POST call', async () => {
    // set the input data for user #3
    var newUser3 = {
      id: 3,
      name: 'Patrick',
      username: 'patrick123',
      email: 'patrick@email.com',
      editing: false
    }
  
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/users')
    expect(wrapper.vm.users.length).toEqual(2)
  
    // call the createUser() function with user #3
    wrapper.vm.createUser(newUser3);
  
    // Wait until the DOM updates
    await flushPromises()

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toBeCalledWith('https://jsonplaceholder.typicode.com/users', newUser3)
  
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.messageType).toMatch('Error')
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to save user data!')
  })

  it('does not delete the user data on failed HTTP DELETE call', async () => {
    // set the input data for the user to delete
    var deleteUser2 = {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    }
  
    // call the createUser() function with user #1
    wrapper.vm.deleteUser(deleteUser2);
  
    // Wait until the DOM updates
    await flushPromises()

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toBeCalledWith('https://jsonplaceholder.typicode.com/users/2')
  
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.messageType).toMatch('Error')
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to delete user #2')
  })

  it('does not update the user data on failed HTTP PUT call', async () => {
    // set the input data for the user to delete
    var updateUser1 = {
      index: 0,
      id: 1,
      name: 'Leanne123',
      username: 'Bret456',
      email: 'Sincere@april.biz'
    }
  
    // call the updateUser() function with user #1
    wrapper.vm.updateUser(updateUser1)
  
    // Wait until the DOM updates
    await flushPromises()
  
    expect(axios.put).toHaveBeenCalledTimes(1)
    expect(axios.put).toBeCalledWith('https://jsonplaceholder.typicode.com/users/1')
  
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.messageType).toMatch('Error')
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to update user #1')
  })
})