/* eslint-disable eol-last */
import { shallowMount, flushPromises } from '@vue/test-utils'
import Content from '@/components/Content.vue'
import axios from 'axios'

// Spy the console log
global.console.log = jest.fn()

// Mock the axios library
jest.mock('axios')

// describe('Content.vue Test', () => {
//   it('renders message when component is created', async () => {
//     // render the component
//     const wrapper = shallowMount(Content)

//     // check that the heading text is rendered
//     const heading = wrapper.findAll('h1')
//     expect(heading.length).toEqual(1)
//     expect(heading[0].text()).toMatch('List of Users:')
//   })
// })

describe('Content.vue Test with Successful HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    const mockGetResponse = {
      data: [
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
      ]
    }

    axios.get.mockResolvedValue(mockGetResponse)
    wrapper = shallowMount(Content)
  })

  afterEach(() => {
    wrapper.unmount()
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('loads the user data when the component is created and mounted', async () => {
    // Wait until the DOM updates
    await flushPromises()

    // Check that the headig ext is rendered
    const heading = wrapper.findAll('h1')
    expect(heading.length).toEqual(1)
    expect(heading[0].text()).toMatch('List of Users:')

    // Check that one call was made to axios.get()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/users')

    expect(wrapper.vm.messageToDisplay).toMatch('SUCCESS! Loaded user data!')
    expect(wrapper.vm.messageType).toMatch('Success')

    // Check that the user data is properly set
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.users[0].name).toMatch('Leanne Graham')
    expect(wrapper.vm.users[0].username).toMatch('Bret')
    expect(wrapper.vm.users[0].email).toMatch('Sincere@april.biz')
    expect(wrapper.vm.users[1].name).toMatch('Ervin Howell')
    expect(wrapper.vm.users[1].username).toMatch('Antonette')
    expect(wrapper.vm.users[1].email).toMatch('Shanna@melissa.tv')
  })
})

describe('Content.vue Test with FAILED HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    // Set the mock call to GET to return a successful GET response
    axios.get.mockRejectedValue(new Error('BAD REQUEST'))

    // render the component
    wrapper = shallowMount(Content)
  })

  afterEach(() => {
    wrapper.unmount()
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('loads no user data when the HTTP GET request fails', async () => {
    // Wait until the DOM updates
    await flushPromises()

    // Check that one call was made to axios.get()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/users')

    // Check that the user data is properly set
    expect(wrapper.vm.users.length).toEqual(0)

    // check that the banner message indicates failure
    // expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to load user data!')
    // expect(wrapper.vm.messageType).toMatch('Error')
    expect(console.log).toHaveBeenNthCalledWith(3, new Error('BAD REQUEST'))
  })
})