from rest_framework import permissions

class ProfilePermission(permissions.BasePermission):

    # loginユーザであることを認証するpermission
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.UserPro.id == request.user.id