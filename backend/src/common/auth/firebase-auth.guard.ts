import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader: string | undefined =
      req.headers?.authorization || req.headers?.Authorization;
    if (!authHeader)
      throw new UnauthorizedException('Missing Authorization header');

    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match)
      throw new UnauthorizedException('Invalid Authorization header format');

    const idToken = match[1];
    try {
      if (!admin.apps.length) admin.initializeApp();
      const decoded = await admin.auth().verifyIdToken(idToken);
      // Attach a minimal user object to request
      req.user = { uid: decoded.uid, email: decoded.email ?? null };
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
