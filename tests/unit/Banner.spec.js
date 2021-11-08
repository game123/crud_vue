import { shallowMount } from '@vue/test-utils'
import Banner from '@/components/Banner.vue'

describe('Banner.vue Test', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // Render the component
    wrapper = shallowMount(Banner, {
      propsData: {
        bannerMessage: '',
        bannerType: ''
      }
    })
  })

  // TEARDOW - run after to each unit test
  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with correct elements', () => {
    // check that the banner message is initialzed to an empty string
    const banner = wrapper.find('#bannerMsg')
    expect(banner.text()).toMatch('')
    expect(banner.isVisible()).toBe(false)
    expect(banner.attributes().style).toMatch('background-color: blue;')
  })

  it('initializes with error message', async () => {
    // set the prop data to display an error message
    await wrapper.setProps({
      bannerMessage: 'Banner message 123',
      bannerType: 'Error'
    })

    // check that the banner message displays the error message
    const banner = wrapper.find('#bannerMsg')
    expect(banner.text()).toMatch('Banner message 123')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: red;')
  })

  it('initializes with success message', async () => {
    // set the prop data to display a success message
    await wrapper.setProps({
      bannerMessage: 'Banner message 456',
      bannerType: 'Success'
    })

    // check that the banner message displays the success message
    const banner = wrapper.find('#bannerMsg')
    expect(banner.text()).toMatch('Banner message 456')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: green;')
  })

  it('initializes with info message', async () => {
    // set the prop data to display an info message
    await wrapper.setProps({
      bannerMessage: 'Banner message 789',
      bannerType: 'Info'
    })

    // check that the banner message displays the info message
    const banner = wrapper.find('#bannerMsg')
    expect(banner.text()).toMatch('Banner message 789')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: blue;')
  })

  it('emits an event when the clear button is clicked', async () => {
    // set the prop data to display an error message
    await wrapper.setProps({
      bannerMessage: 'Banner message 123',
      bannerType: 'Error'
    })

    // trigger an event when the 'Clear' button is clicked
    await wrapper.find('span').trigger('click')

    // check that 1 occurrence of the event has been emitted
    expect(wrapper.emitted('clear-banner')).toBeTruthy()
    expect(wrapper.emitted('clear-banner').length).toBe(1)
  })
})
