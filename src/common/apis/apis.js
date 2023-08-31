export const pushToSocialMedia = async (imageURL) => {
    const SocialPost = require('social-post-api')

    const social = new SocialPost('95NM2TG-D604GZ3-Q1B04TR-CSGWGV3')

    const post = await social
        .post({
            post: 'Today is a great day!',
            platforms: ['instagram', 'twitter', 'pinterest', 'linkedin', 'facebook'],
            mediaUrls: [imageURL],
        })
        .catch(console.error)
    console.log(post)
}
