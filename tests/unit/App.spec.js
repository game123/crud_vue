/* eslint-disable eol-last */
import { mount } from '@vue/test-utils'
import router from '@/router/index'
import App from '@/App.vue'
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import Home from '@/views/Home.vue'
import Blog from '@/views/Blog.vue'
import About from '@/views/About.vue'

describe('App.vue Test', () => {
  let wrapper = null
  let mockStore = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // create a mock of the Vuex store
    mockStore = {
      dispatch: jest.fn(),
      getters: {
        getBannerMessage: '',
        getBannerType: 'Info'
      }
    }
  })

  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders home page', async () => {
    // push the '/' link to vue-router to load the Home page
    router.push('/')
    await router.isReady()

    // render the component plus all sub-components
    wrapper = mount(App, {
      global: {
        plugins: [router],
        provider: {
          store: mockStore
        }
      }
    })

    // check that all 4 sub-components are render
    expect(wrapper.findComponent(Header).exists()).toBe(true)
    expect(wrapper.findComponent(Navigation).exists()).toBe(true)
    expect(wrapper.findComponent(Home).exists()).toBe(true)
    expect(wrapper.findComponent(Footer).exists()).toBe(true)
  })

  it('renders about page', async () => {
    // push the '/about' link to vue-router to load the About page
    router.push('/about')
    await router.isReady()

    // render the component
    wrapper = mount(App, {
      global: {
        plugins: [router],
        provide: {
          store: mockStore
        }
      }
    })

    // check that all 4 sub-components are rendered
    expect(wrapper.findComponent(Header).exists()).toBe(true)
    expect(wrapper.findComponent(Navigation).exists()).toBe(true)
    expect(wrapper.findComponent(About).exists()).toBe(true)
    expect(wrapper.findComponent(Footer).exists()).toBe(true)
  })

  it('renders blog page', async () => {
    // push the '/about' link to vue-router to load the About page
    router.push('/blog')
    await router.isReady()

    // render the component
    wrapper = mount(App, {
      global: {
        plugins: [router],
        provide: {
          store: mockStore
        }
      }
    })

    // check that all 4 sub-components are rendered
    expect(wrapper.findComponent(Header).exists()).toBe(true)
    expect(wrapper.findComponent(Navigation).exists()).toBe(true)
    expect(wrapper.findComponent(Blog).exists()).toBe(true)
    expect(wrapper.findComponent(Footer).exists()).toBe(true)
  })
})