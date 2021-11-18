import { shallowMount } from '@vue/test-utils'
import Banner from '@/components/Banner.vue'

describe('Banner.vue Test', () => {
  let wrapper = null
  let mockStore = null

  // TEARDOW - run after to each unit test
  afterEach(() => {
    wrapper.unmount()
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('initializes with correct elements', () => {
    // create a mock of the Vuex store
    mockStore = {
      dispatch: jest.fn(),
      getters: {
        getBannerMessage: '',
        getBannerType: 'Info'
      }
    }

    wrapper = shallowMount(Banner, {
      global: {
        provide: {
          store: mockStore
        }
      }
    })

    // check that the banner message is initialzed to an empty string
    const banner = wrapper.find('#bannerMsg')
    expect(banner.text()).toMatch('')
    expect(banner.isVisible()).toBe(false)
    expect(banner.attributes().style).toMatch('background-color: blue;')
  })

  it('initializes with error message', async () => {
    // create a mock of the Vuex store
    mockStore = {
      dispatch: jest.fn(),
      getters: {
        getBannerMessage: 'Banner message 123',
        getBannerType: 'Error'
      }
    }

    // render the component
    wrapper = shallowMount(Banner, {
      global: {
        provide: {
          store: mockStore
        }
      }
    })

    // check that the banner message displays the error message
    const banner = wrapper.find('#bannerMsg')
    expect(banner.text()).toMatch('Banner message 123')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: red;')
  })

  it('initializes with success message', () => {
    // create a mock of the Vuex store
    mockStore = {
      dispatch: jest.fn(),
      getters: {
        getBannerMessage: 'Banner message 456',
        getBannerType: 'Success'
      }
    }

    // render the component
    wrapper = shallowMount(Banner, {
      global: {
        provide: {
          store: mockStore
        }
      }
    })

    // check that the banner message displays the success message
    const banner = wrapper.find('#bannerMsg')
    expect(banner.text()).toMatch('Banner message 456')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: green;')
  })

  it('initializes with info message', () => {
    // create a mock of the Vuex store
    mockStore = {
      dispatch: jest.fn(),
      getters: {
        getBannerMessage: 'Banner message 789',
        getBannerType: 'Info'
      }
    }

    // render the component
    wrapper = shallowMount(Banner, {
      global: {
        provide: {
          store: mockStore
        }
      }
    })

    // check that the banner message displays the info message
    const banner = wrapper.find('#bannerMsg')
    expect(banner.text()).toMatch('Banner message 789')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: blue;')
  })

  it('clears an event when the clear button is clicked', async () => {
    // create a mock of the Vuex store
    mockStore = {
      dispatch: jest.fn(),
      getters: {
        getBannerMessage: 'Banner message 789',
        getBannerType: 'Info'
      }
    }

    // render the component
    wrapper = shallowMount(Banner, {
      global: {
        provide: {
          store: mockStore
        }
      }
    })

    // trigger an event when the 'Clear' button is clicked
    await wrapper.find('span').trigger('click')

    // check that 1 occurrence of the event has been emitted
    expect(mockStore.dispatch.mock.calls).toHaveLength(1)
    expect(mockStore.dispatch.mock.calls[0][0]).toEqual('setBanner')
    expect(mockStore.dispatch.mock.calls[0][1]).toEqual({ message: '', type: 'Info' })
  })
})
