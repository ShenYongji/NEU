const posts = {
    '0': {
        author: 'Yongji Shen',
        Title: 'Hello World',
        Label: 'buying',
        Phone: '1234567890',
        Email: 'shen.yo@northeastern.edu',
        Description: 'Hello World'
      },
    '1': {
        author: 'Unknown2',
        Title: 'Hello World2',
        Label: 'selling',
        Phone: '1234567890',
        Email: 'shen.yo@northeastern.edu',
        Description: 'Hello World'
    }
}


let post_index = 2

function getposts(){
    return posts
}

function updateposts({author,Title,Label,Phone,Email,Description}){
    const curr_post_index = post_index
    posts[curr_post_index] = {author,Title,Label,Phone,Email,Description}
    post_index += 1
    return curr_post_index
}

module.exports = {
    updateposts,
    getposts
}