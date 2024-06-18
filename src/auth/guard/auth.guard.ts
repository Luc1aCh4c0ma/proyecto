import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { jwtConstants } from '../constants/jwt.constant';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    // El método canActivate determina si la solicitud puede proceder
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // Obtiene el objeto de solicitud HTTP del contexto de ejecución, 
      // que contiene toda la información sobre la solicitud hecha por el cliente.
      const request = context.switchToHttp().getRequest();
  
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        request.user = payload;
      } catch {
        throw new UnauthorizedException();
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      // Verifica si el tipo es Bearer, si es así, devuelve el token, de lo contrario devuelve undefined
      return type === 'Bearer' ? token : undefined;
    }
  }