
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Item, ItemImage
from .serializers import ItemSerializer
from rest_framework import status
from django.core.mail import send_mail

@api_view(['GET'])
def get_items(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_item(request):
    name = request.data.get('name')
    item_type = request.data.get('item_type')
    description = request.data.get('description')
    cover_image = request.data.get('cover_image')
    images = request.FILES.getlist('images')

    if not name or not item_type or not description or not cover_image:
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

    item = Item.objects.create(name=name, item_type=item_type, description=description, cover_image=cover_image)

    for img in images:
        ItemImage.objects.create(item=item, image=img)

    return Response({"message": "Item successfully added"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def enquire_item(request):
    item_name = request.data.get('item_name')
    item_id = request.data.get('item_id')

    if not item_name or not item_id:
        return Response({'error': 'Missing item name or ID'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        send_mail(
            subject=f'Enquiry Received for {item_name}',
            message=f"Someone enquired about the item:\n\nName: {item_name}\nID: {item_id}",
            from_email='noreply@example.com',
            recipient_list=['admin@example.com'],  # ✅ Static email
        )
        return Response({'message': 'Email sent successfully!'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
