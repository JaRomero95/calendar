describe 'the signin process', type: :feature, js: true do
  it 'signs me in', js: true do
    expect(page).to have_content 'Juan Antonio'
  end
end
