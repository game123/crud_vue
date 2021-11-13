import { shallowMount } from '@vue/test-utils'
import ListUsers from '@/components/ListUsers.vue'

describe('ListUsers.vue Test when user data is read-only', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    wrapper = shallowMount(ListUsers, {
      propsData: {
        users: [
          {
            id: 1,
            name: 'Test User #1',
            username: 'user_1',
            email: 'test1@gmail.com'
          },
          {
            id: 2,
            name: 'Test User #2',
            username: 'user_2',
            email: 'test2@gmail.com'
          }
        ]
      }
    })
  })

  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders a table of users when component is created', () => {
    const wrapper = shallowMount(ListUsers, {
      propsData: {
        users: [
          {
            id: 1,
            name: 'Test User #1',
            username: 'user_1',
            email: 'test1@gmail.com'
          },
          {
            id: 2,
            name: 'Test User #2',
            username: 'user_2',
            email: 'test2@gmail.com'
          }
        ]
      }
    })

    const tableColumns = wrapper.findAll('th')
    expect(tableColumns.length).toEqual(5) // UPDATED!
    expect(tableColumns[0].text()).toMatch('User ID')
    expect(tableColumns[1].text()).toMatch('Name')
    expect(tableColumns[2].text()).toMatch('Username')
    expect(tableColumns[3].text()).toMatch('Email')
    expect(tableColumns[4].text()).toMatch('Actions') // NEW!

    // check that 2 user rows with 4 columns each are created in the table
    const tableData = wrapper.findAll('td')
    expect(tableData.length).toEqual(10) // UPDATED!
    expect(tableData[0].text()).toMatch('1')
    expect(tableData[1].text()).toMatch('Test User #1')
    expect(tableData[2].text()).toMatch('user_1')
    expect(tableData[3].text()).toMatch('test1@gmail.com')
    expect(tableData[4].text()).toMatch('Delete')
    expect(tableData[5].text()).toMatch('2')
    expect(tableData[6].text()).toMatch('Test User #2')
    expect(tableData[7].text()).toMatch('user_2')
    expect(tableData[8].text()).toMatch('test2@gmail.com')
    expect(tableData[9].text()).toMatch('Delete')

    // check that the Delete and Edit buttons are displayed, but
    // the Cancel and Update buttons are not displayed
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toEqual(8)

    const deleteButtons = wrapper.findAll('#deleteButton')
    expect(deleteButtons[0].isVisible()).toBe(true) // User1
    expect(deleteButtons[1].isVisible()).toBe(true) // User2

    const editButtons = wrapper.findAll('#editButton')
    expect(editButtons[0].isVisible()).toBe(true) // User1
    expect(editButtons[1].isVisible()).toBe(true) // User2

    const cancelEditButtons = wrapper.findAll('#cancelEditButton')
    expect(cancelEditButtons[0].isVisible()).toBe(false) // User 1
    expect(cancelEditButtons[1].isVisible()).toBe(false) // User 2

    const updateButtons = wrapper.findAll('#updateButton')
    expect(updateButtons[0].isVisible()).toBe(false) // User 1
    expect(updateButtons[1].isVisible()).toBe(false) // User 2
  })

  it('emits an event when a user is deleted', async () => {
    // trigger an event when the 'Submit' button is clicked
    await wrapper.find('button').trigger('click')

    // check that 1 ocurrence of the event has been emitted
    const emittedEvent = wrapper.emitted('delete-user')
    expect(emittedEvent).toBeTruthy()
    expect(emittedEvent).toHaveLength(1)
  })

  it('emits an event when a user is being edited', async () => {
    // trigger an event when the 'Edit' button is clicked
    await wrapper.find('#editButton').trigger('click', {
      user: {
        id: 1,
        name: 'Name1',
        usernae: 'Username1',
        email: 'Email1'
      }
    })

    // check that 1 occurence of the event has been emitted
    const emittedEvent = wrapper.emitted('edit-user')
    expect(emittedEvent).toBeTruthy()
    expect(emittedEvent).toHaveLength(1)

    // check that the edit values are set based on the user data
    expect(wrapper.vm.inputId).toEqual(1)
    expect(wrapper.vm.inputName).toMatch('Test User #1')
    expect(wrapper.vm.inputUsername).toMatch('user_1')
    expect(wrapper.vm.inputEmail).toMatch('test1@gmail.com')
  })
})

describe('ListUsers.vue Test when user data is editable', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(ListUsers, {
      propsData: {
        users: [
          {
            id: 1,
            name: 'Test User #1',
            username: 'user_1',
            email: 'test1@gmail.com',
            editing: true
          },
          {
            id: 2,
            name: 'Test User #2',
            username: 'user_2',
            email: 'test2@gmail.com',
            editing: false
          },
          {
            id: 3,
            name: 'Test User #3',
            username: 'user_3',
            email: 'test3@gmail.com',
            editing: false
          }
        ]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders a table of users when component is created', () => {
    // check that 5 columns are created in the table
    const tableColumns = wrapper.findAll('th')
    expect(tableColumns.length).toEqual(5)
    expect(tableColumns[0].text()).toMatch('User ID')
    expect(tableColumns[1].text()).toMatch('Name')
    expect(tableColumns[2].text()).toMatch('Username')
    expect(tableColumns[3].text()).toMatch('Email')
    expect(tableColumns[4].text()).toMatch('Actions')

    // check that the Delete and Edit buttons are not displayed, but
    // the Cancel and Update buttons are displayed
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toEqual(12)

    const deleteButtons = wrapper.findAll('#deleteButton')
    expect(deleteButtons[0].isVisible()).toBe(true) // User 1
    expect(deleteButtons[1].isVisible()).toBe(true) // User 2
    expect(deleteButtons[2].isVisible()).toBe(true) // User 3

    const editButtons = wrapper.findAll('#editButton')
    expect(editButtons[0].isVisible()).toBe(false) // User 1
    expect(editButtons[1].isVisible()).toBe(true) // User 2
    expect(editButtons[2].isVisible()).toBe(true) // User 3

    const cancelEditButtons = wrapper.findAll('#cancelEditButton')
    expect(cancelEditButtons[0].isVisible()).toBe(true) // User 1
    expect(cancelEditButtons[1].isVisible()).toBe(false) // User 2
    expect(cancelEditButtons[2].isVisible()).toBe(false) // User 3

    const updateButtons = wrapper.findAll('#updateButton')
    expect(updateButtons[0].isVisible()).toBe(true) // User 1
    expect(updateButtons[1].isVisible()).toBe(false) // User 2
    expect(updateButtons[2].isVisible()).toBe(false) // User 3
  })

  it('emits an event when cancelling that a user is being edited', async () => {
    // trigger an event when the 'Cancel' button is clicked
    await wrapper.find('#cancelEditButton').trigger('click', {
      user: {
        id: 1,
        name: 'Test User #1',
        username: 'user_1',
        email: 'tes1@gmail.com'
      }
    })

    // check that 1 occurence of the event has been emitted
    const emittedEvent = wrapper.emitted('cancel-edit-user')
    expect(emittedEvent).toBeTruthy()
    expect(emittedEvent).toHaveLength(1)

    // check that the input data is cleared after emitting the event
    expect(wrapper.vm.inputId).toBe(0)
    expect(wrapper.vm.inputName).toMatch(/^$/)
    expect(wrapper.vm.inputUsername).toMatch(/^$/)
    expect(wrapper.vm.inputEmail).toMatch(/^$/)
  })

  it('emits an event when updating a user', async () => {
    // set the input data
    wrapper.vm.inputId = 2
    wrapper.vm.inputName = 'name2'
    wrapper.vm.inputUsername = 'username2'
    wrapper.vm.inputEmail = 'user2@email.com'

    // trigger an event when the 'Cancel' button is clicked
    await wrapper.find('#updateButton').trigger('click', { index: 0 })

    // check that 1 occurence of the event has been emitted
    const emittedEvent = wrapper.emitted('update-user')
    expect(emittedEvent).toBeTruthy()
    expect(emittedEvent).toHaveLength(1)

    // check that the input data is cleared after emitting the event
    expect(wrapper.vm.inputId).toBe(0)
    expect(wrapper.vm.inputName).toMatch(/^$/)
    expect(wrapper.vm.inputUsername).toMatch(/^$/)
    expect(wrapper.vm.inputEmail).toMatch(/^$/)
  })
})
