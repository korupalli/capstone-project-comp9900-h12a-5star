from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from profile.models import UserProfile
from movie_review.models import movies,reviews

@api_view(['POST', ])
def add_review(request):
    print(request.data)
    try:
        a = UserProfile.objects.get(username=request.data['user'])
        print('abc ', a)
    except Exception as e:
        response = {
            'success': 'False',
            'status code': status.HTTP_400_BAD_REQUEST,
            'message': str(e),
            }
        return Response(response)

    try:
        e = reviews()
        e.movie_id = request.data['movie']
        e.review_user_id = request.data['user']
        e.review = request.data['review']
        e.rating=request.data['rating']
        e.save()
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'message': 'Review added for a particular user and movie',
                }
    except Exception:
        for i in reviews.objects.filter(movie__movie_id=request.data['movie'] , review_user_id=request.data['user']):
            i.review = request.data['review']
            i.rating=request.data['rating']
            

            i.save()
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'message': 'Review updated',
                }
    return Response(response)

@api_view(['GET', ])
def get_review(request):
    #print(request.data.keys())
    print("here")
    print(request.data)
    if 'movie' in request.data.keys() and 'user' in request.data.keys():
        for i in reviews.objects.filter(movie__movie_id=request.data['movie'] , review_user_id=request.data['user']):
            response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'review':i.review,
                'rating':i.rating,
                'watched':i.watched,
                'liked':i.liked,
                'wishlist':i.wishlist
                }
    elif 'movie' in request.data.keys():
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'review':[],
                'user':[],
                'rating':[],
                'liked':[],
                'wishlist':[],
                'watched':[]
                }
        for i in reviews.objects.filter(movie__movie_id=request.data['movie']):
            response['review'].append(i.review)
            response['user'].append(i.review_user_id)
            response['rating'].append(i.rating)
            response['liked'].append(i.liked)
            response['wishlist'].append(i.wishlist)
            response['watched'].append(i.watched)

    else:
        response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'review':[],
                'movie':[],
                'rating': [],
                'liked': [],
                'wishlist': [],
                'watched': []
                }
        for i in reviews.objects.filter(review_user_id=request.data['user']):
            response['review'].append(i.review)
            response['rating'].append(i.rating)
            response['movie'].append(i.movie_id)
            response['liked'].append(i.liked)
            response['wishlist'].append(i.wishlist)
            response['watched'].append(i.watched)
    #print("resp",type(response))
    return Response(response)
